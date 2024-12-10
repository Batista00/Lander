<script lang="ts">
    import type { PageData } from './$types';
    import { LandingComponent } from '@/components/LandingComponent.svelte';
    
    export let data: PageData;
    const { landing } = data;
</script>

<svelte:head>
    <title>{landing.name}</title>
    <meta name="description" content={landing.name} />
</svelte:head>

<div class="published-landing">
    {#each landing.components as component (component.id)}
        <LandingComponent {component} />
    {/each}
</div>

<style>
    .published-landing {
        width: 100%;
        min-height: 100vh;
        background-color: white;
    }
</style>
