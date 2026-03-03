<template>
    <div id="app">
        <header class="header">
            <nav>
                <router-link to="/">Accueil</router-link> |
                <router-link to="/Booking">Booking</router-link> |
                <router-link to="/Connection">Connection</router-link> |
                <router-link to="/Contact">Contact</router-link>
            </nav>
        </header>

        <router-view/>

    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>
