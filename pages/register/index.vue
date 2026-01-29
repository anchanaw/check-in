<template>
    <header class="register-header">
        <!-- top bar -->
        <div class="top-bar">
            <div class="title">Create Your Account</div>
        </div>

        <!-- subtitle -->
        <p class="subtitle">
            Invited by Mentor : {{ mentorName }}<br />
            From {{ teamName }}
        </p>
    </header>

    <!-- Form Card -->
    <BaseCard maxWidth="320px">
        <a-form layout="vertical" @finish="onSubmit">
            <!-- First / Last Name -->
            <a-form-item label="First Name" name="firstName" :rules="req">
                <a-input placeholder="Value" />
            </a-form-item>

            <a-form-item label="Last Name" name="lastName" :rules="req">
                <a-input placeholder="Value" />
            </a-form-item>

            <!-- Display Name -->
            <a-form-item label="Display Name" name="displayName" :rules="req">
                <a-input placeholder="Value" />
            </a-form-item>

            <!-- Email -->
            <a-form-item label="Email" name="email" :rules="[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Invalid email' }
            ]">
                <a-input placeholder="Value" />
            </a-form-item>

            <!-- Password -->
            <a-form-item label="Password" name="password" :rules="req">
                <a-input-password placeholder="Value" />
            </a-form-item>

            <a-form-item label="Confirm Password" name="confirmPassword" :rules="[
                { required: true, message: 'Confirm password' },
                { validator: validateConfirm }
            ]">
                <a-input-password placeholder="Value" />
            </a-form-item>

            <!-- Gender -->
            <a-form-item label="Gender" name="gender">
                <a-select placeholder="Select">
                    <a-select-option value="male">Male</a-select-option>
                    <a-select-option value="female">Female</a-select-option>
                    <a-select-option value="other">Other</a-select-option>
                </a-select>
            </a-form-item>

            <!-- Date of Birth -->
            <a-form-item label="Date of Birth" name="dob">
                <a-date-picker class="full-width" placeholder="Select date" />
            </a-form-item>

            <!-- University -->
            <a-form-item label="University" name="university">
                <a-input placeholder="Value" />
            </a-form-item>

            <!-- Student ID -->
            <a-form-item label="Student ID" name="studentId">
                <a-input placeholder="Value" />
            </a-form-item>

            <!-- Submit -->
            <a-form-item>
                <a-button type="primary" html-type="submit" block>
                    Sign Up
                </a-button>
            </a-form-item>
            <div class="login-link">Already have an account?
                <NuxtLink to="/login">Sign In</NuxtLink>
            </div>
        </a-form>
    </BaseCard>
</template>

<script setup>
definePageMeta({ layout: 'mobile' })

const req = [{ required: true, message: 'Required' }]

const validateConfirm = ({ getFieldValue }) => ({
    validator(_, value) {
        if (!value || value === getFieldValue('password')) {
            return Promise.resolve()
        }
        return Promise.reject('Passwords do not match')
    }
})

const onSubmit = (values) => {
    console.log('register values:', values)
}
</script>

<style scoped>
.register-header {
    width: 100%;
    background: #6CBCFA;
    padding-bottom: 16px;
}

/* top bar */
.top-bar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.title {
    font-size: 18px;
    font-weight: 600;
}

/* subtitle */
.subtitle {
    margin: 4px 16px 0;
    text-align: center;
    font-size: 14px;
    line-height: 1.4;
}

.login-link {
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
}

.login-link a {
  color: #6CBCFA;
  text-decoration: underline;
}
</style>
