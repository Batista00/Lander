<script lang="ts">
    import type { PageData } from './$types';
    import { componentMap } from '@/components/landing-components/componentMap';
    
    export let data: PageData;
    const { landing } = data;
</script>

<svelte:head>
    <title>{landing.name}</title>
    <meta name="description" content={landing.description || landing.name} />
    {#if landing.publishConfig?.seo}
        <meta name="title" content={landing.publishConfig.seo.title} />
        <meta name="description" content={landing.publishConfig.seo.description} />
    {/if}
</svelte:head>

<div class="published-landing">
    {#each landing.components as component (component.id)}
        {#if componentMap[component.type]}
            <svelte:component 
                this={componentMap[component.type].component}
                content={component.content}
                mode="preview"
            />
        {/if}
    {/each}
</div>

<style>
    .published-landing {
        width: 100%;
        min-height: 100vh;
        background-color: white;
    }
</style>
