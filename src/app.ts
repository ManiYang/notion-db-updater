console.log("hello");


let set: Set<Number> = new Set([1, 2, 3]);
const set2: Set<Number> = new Set([3, 4, 5]);

set = set.union(set2)

for (const item of set) {
    console.log(item);
}
