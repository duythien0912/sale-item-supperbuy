function arrayUnique(array) {
  var a = array.concat()
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i].id === a[j].id) {
        a.splice(j--, 1)
      } else {
        // console.log(a[j])
      }
    }
  }

  return a
}

function merge_array(array1, array2) {
  return arrayUnique(array2.concat(array1))
}

export { merge_array }
