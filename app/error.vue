<template>
    <NuxtLayout>
        <div class="prose" v-if="error">
            <template v-if="error.statusCode === 404">
                <h1>404!</h1>
                <p style="color:#cf0aed">Sorry, that page doesn't exist.</p>
            </template>
            <template v-else>
                <h1>Gulp!</h1>
                <p style="color:#e8154a">
                    <strong>{{ error.message }}</strong>
                </p>
                <p>It looks like something broke.</p>
                <p>Sorry about that.</p>
            </template>
            <!--p style="color:#41f07b"-->
            <button class="text-sm bg-green-500 text-black font-bold underline py-2 px-4 rounded" @click="handleError">
                Go back to main page.
            </button>
            <!--/p-->
        </div>
    </NuxtLayout>
</template>
  
<script setup>
const error = useError()

const handleError = () => {
    clearError({
        redirect:
            '/'
    })
}
</script>