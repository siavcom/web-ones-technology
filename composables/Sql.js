export const Sql = (initial = 0) => {

    const count = ref(initial)
    function increment() {
        count.value++
    }
    function decrement() {
        count.value--
    }
    return { ...valueA, ...valueB }
}