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
	"fmt"
	"go/ast"
)

// http://golang.org/pkg/go/ast/#FuncType || godoc go/ast FuncType
//  Func    token.Pos  // position of "func" keyword
//  Params  *FieldList // (incoming) parameters; or nil
//  Results *FieldList // (outgoing) results; or nil

// http://golang.org/pkg/go/ast/#FieldList || godoc go/ast FieldList
//  Opening token.Pos // position of opening parenthesis/brace, if any
//  List    []*Field  // field list; or nil
//  Closing token.Pos // position of closing parenthesis/brace, if any

// http://golang.org/pkg/go/ast/#Field || godoc go/ast Field
//  Doc     *CommentGroup // associated documentation; or nil
//  Names   []*Ident      // field/method/parameter names; or nil if anonymous field
//  Type    Expr          // field/method/parameter type
//  Tag     *BasicLit     // field tag; or nil
//  Comment *CommentGroup // line comments; or nil

// Gets the parameters.
func joinParams(f *ast.FuncType) string {
	isFirst := true
	s := ""

	//if f.Params == nil {
		//return s
	//}

	for _, list := range f.Params.List {
		for _, v := range list.Names {
			if !isFirst {
				s += "," + SP
			}
			s += v.Name

			if isFirst {
				isFirst = false
			}
		}
	}

	return s
}

// Gets the results to use both in the declaration and in its return.
func joinResults(f *ast.FuncType) (decl, ret string) {
	isFirst := true
	isMultiple := false

	if f.Results == nil {
		return
	}

	for _, list := range f.Results.List {
		if list.Names == nil {
			continue
		}

		init := initValue(list.Type, "")

		for _, v := range list.Names {
			if !isFirst {
				decl += "," + SP
				ret += "," + SP
				isMultiple = true
			} else {
				isFirst = false
			}

			decl += fmt.Sprintf("%s=%s", v.Name+SP, SP+init)
			ret += v.Name
		}
	}

	if decl != "" {
		decl = "var " + decl + ";"
	}

	if isMultiple {
		ret = "[" + ret + "]"
	}
	ret = "return " + ret + ";"

	return
}
