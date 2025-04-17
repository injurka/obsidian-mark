<script setup lang="ts">
interface NavItem {
  sysname: string
  title: string
  description: string
  icon: string
}

const { staticBaseUrl } = useRuntimeConfig().public

const { data: navData } = await useAsyncData<NavItem[]>(`nav-root`, async () => {
  return await $fetch<NavItem[]>(
    `${staticBaseUrl}/content/nav.json`,
    { method: 'get', responseType: 'json' },
  )
})

const hoveredItem = ref<string | null>(null)

function setHoveredItem(sysname: string | null) {
  hoveredItem.value = sysname
}

async function handleSelectItem(item: NavItem) {
  await navigateTo(`/${item.sysname}`)
}
</script>

<template>
  <div class="gradient-background">
    <v-container class="vault-container py-12">
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h1 class="vault-title text-white text-h2 font-weight-bold">
            Доступные хранилища
          </h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          v-for="item in navData"
          :key="item.sysname"
          cols="12" sm="6" md="4" lg="4"
        >
          <v-card
            class="vault-card"
            :class="{ 'vault-card--hovered': hoveredItem === item.sysname }"
            elevation="4"
            rounded="lg"
            @mouseenter="setHoveredItem(item.sysname)"
            @mouseleave="setHoveredItem(null)"
            @click="handleSelectItem(item)"
          >
            <div class="vault-card-accent" />

            <v-card-item>
              <v-img
                class="vault-card__icon mb-4"
                width="100"
                height="100"
                :src="item.icon"
              />

              <v-card-title class="vault-card__title text-h5 font-weight-bold">
                {{ item.title }}
              </v-card-title>

              <v-card-text class="vault-card__description text-body-1 pt-2 pb-0">
                {{ item.description }}
              </v-card-text>
            </v-card-item>

            <v-card-actions class="justify-end vault-card__actions">
              <v-btn
                variant="text"
                color="primary"
                icon
                class="vault-card__arrow"
              >
                <v-icon icon="mdi-arrow-right" />
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.gradient-background {
  background: linear-gradient(135deg, #535e85 0%, #76569c 100%);
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.vault-container {
  position: relative;
  z-index: 1;
  max-width: 1400px;
}

.vault-title {
  margin-bottom: 2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.vault-card {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  background-color: rgba(236, 236, 236, 0.9) !important;
  cursor: pointer;

  &-accent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, #6e8efb, #a777e3);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &--hovered {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15) !important;

    .vault-card-accent {
      transform: scaleX(1);
    }

    .vault-card__arrow {
      transform: translateX(0);
      opacity: 1;
    }
  }

  &__title {
    color: #333;
    margin-top: 0.5rem;
  }

  &__description {
    color: #666;
    line-height: 1.5;
  }

  &__arrow {
    transform: translateX(20px);
    opacity: 0;
    transition: all 0.3s ease;
  }

  &__actions {
    padding-top: 0;
  }
}

@media (max-width: 600px) {
  .vault-title {
    font-size: 1.8rem !important;
  }

  .vault-card--hovered {
    transform: none;
  }

  .vault-card__arrow {
    opacity: 1;
    transform: none;
  }
}
</style>
