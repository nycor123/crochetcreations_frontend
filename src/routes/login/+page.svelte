<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Alert from './Alert.svelte';

    export let data;

    $: isLoggedIn = data.userInfo != null;

    let email;
    let password;
    let loginAttempted = false;
    let alertProps = {};

    onMount(() => {
        if (isLoggedIn) {
            redirect();
        }
    });
    
    async function authenticate() {
        let response = await fetch("http://localhost:8080/api/v1/auth/signin", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        let responseObj = await response.json();
        let jwtToken = responseObj.token;
        if (jwtToken) {
            loginAttempted = true;
            alertProps = {
                alertClass: "alert alert-success",
                message: "Login successful! Redirecting..."
            }
            await redirect();
        } else {
            loginAttempted = true;
            alertProps = {
                alertClass: "alert alert-danger",
                message: "Invalid username/password"
            }
        }
    }

    async function redirect() {
        let response = await fetch("http://localhost:8080/api/v1/user/info", {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json"
            }
        });
        let responseObj = await response.json();
        if (responseObj.role === "ADMIN") {
            goto("/admin");
        } else {
            goto("/");
        }
    }
</script>

{#if loginAttempted}
    <Alert {...alertProps}/>
{/if}

<div class="login-form row mx-auto">
    <div class="col-sm-12 col-md-6 col-lg-4 mx-auto">
        <h1>Login</h1>
        <form class="mb-3" on:submit={authenticate}>
            <div class="mb-3">
                <label for="emailInput" class="form-label">Email address</label>
                <input type="email" class="form-control" id="emailInput" bind:value={email} aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="passwordInput" class="form-label">Password</label>
                <input type="password" class="form-control" id="passwordInput" bind:value={password}>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <a href="/">Home</a>
    </div>
</div>

<style>
    .login-form {
        margin-top: 2em;
    }
</style>