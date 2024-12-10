<script lang="ts">
    import { page } from '$app/stores';
</script>

<div class="error-container">
    <h1>Página no encontrada</h1>
    <p>La página que estás buscando no existe o ha sido eliminada.</p>
    <a href="/">Volver al inicio</a>
</div>

<style>
    .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
        text-align: center;
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: #333;
    }

    p {
        color: #666;
        margin-bottom: 2rem;
    }

    a {
        color: #0066cc;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border: 1px solid #0066cc;
        border-radius: 4px;
        transition: all 0.2s ease;
    }

    a:hover {
        background-color: #0066cc;
        color: white;
    }
</style>
