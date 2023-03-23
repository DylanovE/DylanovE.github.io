<template>
    <th>
        <div class="dropdown">
            <IconFilter style="height: 100%;"/>
            <form class="dropdown-menu p-3" aria-labelledby="dropdownRoleFilterSvg">
                <div v-for="(roleName, roleId) in roleMap" :key="roleId" class="form-check">
                    <input :id="'role-' + roleId" v-model="filterRoles" class="form-check-input" type="checkbox" :value="roleId" @click="$emit('filter', roleId)">
                    <label class="form-check-label" :for="'role-' + roleId">{{ roleName }}</label>
                </div>
            </form>
        </div>
    </th>
</template>
<script setup>
import IconFilter from '@/components/icons/IconFilter.vue'

defineEmits(['filter'])

defineProps({
    roleMap: {
            type: Array,
            default: undefined
        }
    });
</script>