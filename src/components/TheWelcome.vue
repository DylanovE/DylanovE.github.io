<script setup>
import WelcomeItem from '@/components/WelcomeItem.vue'
import CommunityIcon from '@/components/icons/IconCommunity.vue'
import DocumentationIcon from '@/components/icons/IconDocumentation.vue'
import SupportIcon from '@/components/icons/IconSupport.vue'
</script>

<template>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>The <a class="fw-semibold" href="https://owow.io/" target="_blank" rel="noopener">OWOW</a> Project</template>
    This assignment is made to validate the skills of potential new developers as an addition to
    OWOW. During this assignment you will be developing an application for OWOW, “Wizkid
    Manager 2000”.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>WizKid Manager 2000!</template>
    Wizkid Manager 2000 is an application that is focused on managing the WizKids of OWOW.
    The application will provide features such as adding, viewing, updating, and deleting of
    WizKids.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Soon...</template>
    There's nothing <a class="fw-semibold" href="https://http.cat/404" target="_blank" rel="noopener">here</a> yet!
  </WelcomeItem>
</template>
