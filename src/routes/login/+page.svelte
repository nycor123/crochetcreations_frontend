<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { backendUrls, getUserInfo, signinWithGoogleUrl } from '$lib/index.js';
    import Alert from './Alert.svelte';

    let userData;

    onMount(async () => {
        userData = await getUserInfo();
        if (userData != null) {
            goto('/');
        }
    });

    let email;
    let password;
    let loginAttempted = false;
    let alertProps = {};

    async function authenticate() {
        let response = await fetch(backendUrls.signInUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
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
                alertClass: 'alert alert-success',
                message: 'Login successful! Redirecting...'
            }
            userData = await getUserInfo();
            await redirect();
        } else {
            loginAttempted = true;
            alertProps = {
                alertClass: 'alert alert-danger',
                message: 'Invalid username/password'
            }
        }
    }

    async function redirect() {
        if (userData.role.toLowerCase() === 'admin') {
            goto('/admin');
        } else {
            goto('/');
        }
    }
</script>

{#if loginAttempted}
    <Alert {...alertProps}/>
{/if}

<div class='login-form row mx-auto' style="color: #806657;">
    <div class='col-sm-12 col-md-6 col-lg-4 mx-auto'>
        <h1>Login</h1>
        <form class='mb-3' on:submit={authenticate}>
            <div class='mb-3'>
                <label for='emailInput' class='form-label'>Email address</label>
                <input type='email' class='form-control' id='emailInput' style="tint-color: red;" bind:value={email} aria-describedby='emailHelp'>
            </div>
            <div class='mb-3'>
                <label for='passwordInput' class='form-label'>Password</label>
                <input type='password' class='form-control' id='passwordInput' bind:value={password}>
            </div>
            <button type='submit' class='btn btn-primary' style="background-color: #9e806d; border: none;">Submit</button>
        </form>
        <p><a href={signinWithGoogleUrl} style="color: #9e806d;">Sign in with Google</a></p>
        <a href='/' style="color: #9e806d;">Back to Home</a>
    </div>
</div>

<style>
    .login-form {
        padding-top: 2em;
    }
    input:focus {
        border-color: #806657;
        box-shadow: 0 0 0 0.2rem rgba(34, 142, 59, 0.25);
    }
</style>