export async function arraysStringifyEqualAsync(a, b) {

    if (JSON.stringify(a) === JSON.stringify(b)) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
    let a_sorted = [...a.sort()]
    let b_sorted = [...b.sort()]

    for (let i = 0; i < a_sorted.length; ++i) {
      if (a_sorted[i] !== b_sorted[i]) return false;
    }
    return true;
};
export async function arraysEqualAsync(a, b) {

    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
    let a_sorted = [...a.sort()]
    let b_sorted = [...b.sort()]

    for (let i = 0; i < a_sorted.length; ++i) {
      if (a_sorted[i] !== b_sorted[i]) return false;
    }
    return true;
};
export function arraysEqual(a, b) {

    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
    let a_sorted = [...a.sort()]
    let b_sorted = [...b.sort()]

    for (let i = 0; i < a_sorted.length; ++i) {
      if (a_sorted[i] !== b_sorted[i]) return false;
    }
    return true;
};
// This arrays equal search is supposed to be sorting Neutral
export async function arraysIdenticalAsync(arr1, arr2) {
      var i = arr1.length;
    if (i !== arr2.length) {
        return false;
    }
    while (i--) {
        if (arr1[i] !== arr2[i]) {

            return false;
        }
    }
    return true;
}
export function arraysIdentical(arr1, arr2) {

    let i = arr1.length;
    if (i !== arr2.length) {
        return false;
    }
    while (i--) {

        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

