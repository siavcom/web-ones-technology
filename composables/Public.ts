const state = reactive({
    Public: {
        Company: "",
        User: "",
        token: ""
    },
})


export const Public = computed(() => {
    const { Public } = toRefs(state)
    return Public.value
})
