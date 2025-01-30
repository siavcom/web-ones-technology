
const state= reactive({
    count: 0,  // initial value
    localSql: { 
        View:{}, 
        Table:{} }

})

export const Sql = () => {

    const {count,localSql} = toRefs(state) // Hace referencia al valor inicial
    
    function increment() {
        count.value++
    }
    function decrement() {
        count.value--
    }

//

    return { increment, decrement }
}