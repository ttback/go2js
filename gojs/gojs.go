// Copyright 2011  The "GoJscript" Authors
//
// Use of this source code is governed by the BSD 2-Clause License
// that can be found in the LICENSE file.
//
// This software is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
// OR CONDITIONS OF ANY KIND, either express or implied. See the License
// for more details.

package gojs

import (
	"bytes"
	"errors"
	"fmt"
	"go/ast"
	"go/parser"
	"go/token"
	"io/ioutil"
	"os"
	"path"
	"strings"
)

const HEADER = "/* Generated by GoJscript <github.com/kless/GoJscript> */"

// To be able to minimize code
const (
	NL  = "{{NL}}" // new line
	SP  = "{{SP}}" // space
	TAB = "{{TAB}}"

	EMPTY = "\"\"" // empty string
)

// Represents the code transformed to JavaScript.
type transform struct {
	fset          *token.FileSet
	*bytes.Buffer // sintaxis translated to JS
	*dataStmt     // extra data for a statement

	err      []error  // errors
	warn     []string // warnings
	public   []string // declarations to be exported
	//pointers []string

	line     int // actual line
	hasError bool
}

func newTransform() *transform {
	return &transform{
		token.NewFileSet(),
		new(bytes.Buffer),
		&dataStmt{},

		make([]error, 0, 8),
		make([]string, 0, 8),
		make([]string, 0),
		0,
		false,
	}
}

// Returns the line number.
func (tr *transform) getLine(pos token.Pos) int {
	// -1 because it was inserted a line (the header)
	return tr.fset.Position(pos).Line - 1
}

// Appends new lines according to the position.
// Returns a boolean to indicate if have been added.
func (tr *transform) addLine(pos token.Pos) bool {
	var s string

	new := tr.getLine(pos)
	dif := new - tr.line

	if dif == 0 {
		return false
	}

	for i := 0; i < dif; i++ {
		s += NL
	}

	tr.WriteString(s)
	tr.line = new
	return true
}

// Appends an error.
func (tr *transform) addError(value interface{}, a ...interface{}) {
	if len(tr.err) == cap(tr.err) {
		return
	}

	switch typ := value.(type) {
	case string:
		tr.err = append(tr.err, fmt.Errorf(typ, a...))
	case error:
		tr.err = append(tr.err, typ)
	default:
		panic("wrong type")
	}

	if !tr.hasError {
		tr.hasError = true
	}
}

// Appends a warning message.
func (tr *transform) addWarning(format string, a ...interface{}) {
	if len(tr.warn) == cap(tr.warn) {
		return
	}
	tr.warn = append(tr.warn, fmt.Sprintf(format, a...))
}

// Appends public declaration names to be exported.
func (tr *transform) checkPublic(s string) {
	if ast.IsExported(s) {
		tr.public = append(tr.public, s)
	}
}

// * * *

// Compiles a Go source file into JavaScript.
// Writes the output in "filename" but with extension ".js".
func Compile(filename string) error {
	trans := newTransform()

	/* Parse several files
	parse.ParseFile(fset, "a.go", nil, 0)
	parse.ParseFile(fset, "b.go", nil, 0)
	*/

	// If Go sintaxis is incorrect then there will be an error.
	node, err := parser.ParseFile(trans.fset, filename, nil, 0) //parser.ParseComments)
	if err != nil {
		return err
	}

	trans.WriteString(HEADER)

	for _, decl := range node.Decls {
		switch decl.(type) {
		case *ast.FuncDecl:
			trans.getFunc(decl.(*ast.FuncDecl))

		// http://golang.org/pkg/go/ast/#GenDecl || godoc go/ast GenDecl
		//  Tok    token.Token   // IMPORT, CONST, TYPE, VAR
		//  Specs  []Spec
		case *ast.GenDecl:
			genDecl := decl.(*ast.GenDecl)

			switch genDecl.Tok {
			case token.IMPORT:
				trans.getImport(genDecl.Specs)
			case token.CONST:
				trans.getConst(genDecl.Specs)
			case token.TYPE:
				trans.getType(genDecl.Specs)
			case token.VAR:
				trans.getVar(genDecl.Specs)
			}

		default:
			panic(fmt.Sprintf("unimplemented: %T", decl))
		}
	}

	// Any error?
	if trans.hasError {
		fmt.Fprintln(os.Stderr, " == Errors\n")

		for _, err := range trans.err {
			fmt.Fprintf(os.Stderr, "%s\n", err)
		}
		if len(trans.err) == cap(trans.err) {
			fmt.Fprintln(os.Stderr, "\n Too many errors")
		}

		return errors.New("") // to indicate that there was any error
	}

	// Export declarations in packages
	//
	// https://developer.mozilla.org/en/JavaScript/Reference/Statements/export
	if getExpression(node.Name) != "main" && len(trans.public) != 0 {
		for i, v := range trans.public {
			if i == 0 {
				trans.WriteString(NL + NL + "export " + v)
			} else {
				trans.WriteString("," + SP + v)
			}
		}

		trans.WriteString(";")
	}
	trans.WriteString(NL)

	// === Write
	name := strings.Replace(filename, path.Ext(filename), "", 1)
	str := trans.String()

	// Version to debug
	deb := strings.Replace(str, NL, "\n", -1)
	deb = strings.Replace(deb, TAB, "\t", -1)
	deb = strings.Replace(deb, SP, " ", -1)

	if err := ioutil.WriteFile(name+".js", []byte(deb), 0664); err != nil {
		return err
	}
/*
	// Minimized version
	min := strings.Replace(str, NL, "", -1)
	min = strings.Replace(min, TAB, "", -1)
	min = strings.Replace(min, SP, "", -1)

	if err := ioutil.WriteFile(name + ".min.js", []byte(min), 0664); err != nil {
		return err
	}*/

	fmt.Print(deb) // TODO: delete*/

	// Print warnings
	if len(trans.warn) != 0 {
		fmt.Fprintln(os.Stderr, " == Warnings\n")

		for _, v := range trans.warn {
			fmt.Fprintln(os.Stderr, v)
		}
		if len(trans.warn) == cap(trans.warn) {
			fmt.Fprintln(os.Stderr, "\n Too many warnings")
		}
	}

	return nil
}