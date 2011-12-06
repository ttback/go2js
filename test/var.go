package test

var a int32
var b, c, d float64
var e = 0
var f, g float32 = -1, -2
var (
	h       int32
	i, j, k = 2.0, 3.0, "bar"
)

var l = true   // l has type bool
var m = 0      // m has type int
var n = 3.0    // n has type float64
var o = "OMDB" // o has type string

//var A, B = complexSqrt(-1)
//var _, found = entries[name] // map lookup; only interested in "found"

// Array
var (
	a1 = new([32]byte)
	a2 = new([2][4]uint32)
	//a3 = [2*N] struct { x, y int32 }
	a4 = [1000]*float64{}
	a5 = [4]byte{}
	a6 = [3][5]int32{}
	a7 = [2][2][2]float64{} // same as [2]([2]([2]float64))

	b1 = [32]byte{1, 2, 3, 4}
	b2 = [4]byte{1, _, _, 4}
)

// Slice
var (
	s1 = make([]int32, 10)
	s2 = make([]int32, 10, 20)

	s3 = []int32{2, 4, 6}
	s4 = []int32{1, _, 3}
	s5 = [...]string{"a", "b", "c"}
)

// Map
var (
	m1 = make(map[string]int32, 100) // map with initial space for 100 elements
	m2 = make(map[string]int32)
	m3 = map[int32]string{
		1: "first",
		2: "second",
		3: "third",
	}
	m4 = map[int32]interface{}{
		1: "first",
		2: 2,
		3: 3,
	}
)

// Pointer
var (
	p0 *byte
	p1 *int32 = 2
	p2 *bool = true
)

func main() {
	a, b := 0, 10
	f := func() int32 { return 7 }
	ch := make(chan int32)
	fa, fb := os.Pipe(fd) // os.Pipe() returns two values
	_, fc, _ := coord(p)  // coord() returns three values; only interested in y coordinate

	fd, fe := nextField(str, 0)
	ff, fg := nextField(str, offset) // redeclares offset
}
