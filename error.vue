<template>
    <NuxtLayout>
        <div class="prose" v-if="error">
            <template v-if="error.statusCode === 404">
                <h1>404!</h1>
                <p>Sorry, that page doesn't exist.</p>
            </template>
            <template v-else>
                <h1>Gulp!</h1>
                <p>
                    <strong>{{ error.message }}</strong>
                </p>
                <p>It looks like something broke.</p>
                <p>Sorry about that.</p>
            </template>
            <p>
                Go back to
                <a @click="handleError">
                    main page.
                </a>
            </p>
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