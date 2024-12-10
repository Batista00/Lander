<script lang="ts">
    import type { PageData } from './$types';
    import { useLandingStore } from '@/store/landingStore';
    import { onMount } from 'svelte';
    
    export let data: PageData;
    const { landings } = data;
    const { setCurrentLanding } = useLandingStore();
    
    onMount(() => {
        // Actualizar el store con las landing pages cargadas
        useLandingStore.setState({ landings });
    });
</script>

<div class="min-h-screen bg-gray-50">
    <!-- Barra superior -->
    <div class="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-semibold text-gray-900">Landing Pages</h1>
            <button 
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                on:click={() => {
                    setCurrentLanding(null);
                    window.location.href = '/landing/new';
                }}
            >
                Nueva Landing Page
            </button>
        </div>
    </div>

    <!-- Lista de landing pages -->
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {#if landings.length === 0}
            <div class="text-center py-12">
                <h3 class="mt-2 text-sm font-medium text-gray-900">No hay landing pages</h3>
                <p class="mt-1 text-sm text-gray-500">Comienza creando tu primera landing page.</p>
                <div class="mt-6">
                    <button
                        type="button"
                        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        on:click={() => {
                            setCurrentLanding(null);
                            window.location.href = '/landing/new';
                        }}
                    >
                        Crear Landing Page
                    </button>
                </div>
            </div>
        {:else}
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {#each landings as landing}
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="w-0 flex-1">
                                    <h3 class="text-lg font-medium text-gray-900 truncate">
                                        {landing.name}
                                    </h3>
                                    <p class="mt-1 text-sm text-gray-500">
                                        {landing.published ? 'Publicada' : 'Borrador'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-5 py-3">
                            <div class="text-sm">
                                <button
                                    class="font-medium text-blue-600 hover:text-blue-500"
                                    on:click={() => {
                                        setCurrentLanding(landing);
                                        window.location.href = `/landing/${landing.id}`;
                                    }}
                                >
                                    Editar
                                </button>
                                {#if landing.published}
                                    <a
                                        href={landing.publishedUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="font-medium text-green-600 hover:text-green-500 ml-4"
                                    >
                                        Ver publicada
                                    </a>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>
