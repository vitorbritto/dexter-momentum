// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// CALLSTACK
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

/** 
 * Function Execution Stack (a.k.a Call Stack)
 *
 * OUT [ fn3() ] v
 *  ^  [ fn2() ] v
 *  ^  [ fn1() ] IN
 */

function fn1() {
  console.log('fn1')
}

function fn2() {
  console.log('fn2')
}

function fn3() {
  console.log('fn3')
}

fn1()
fn2()
fn3()



function fn11() {
  console.log('fn11')
  return 'fn11'
}

function fn21() {
  fn11()
  console.log('fn21')
  return 'fn21'
}

function fn31() {
  fn21()
  
  return 'fn31'
}

fn31()