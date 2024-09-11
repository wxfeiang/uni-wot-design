<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    required: false,
  },
  focus: {
    type: Boolean,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
  background: {
    type: String,
    required: false,
    default: '#ededed',
  },
  closeText: {
    type: String,
    default: '确定',
  },
  inputShow: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: Number,
    default: 10,
  },
})

const emits = defineEmits(['update:value', 'check', 'confirm', 'submit', 'close', 'update:visible'])

const onKeyboard = (key) => {
  switch (key) {
    case '回退':
      emits('update:value', props.value.slice(0, -1))
      break
    case '确定':
      if (props.value.charAt(props.value.length - 1) !== '.') {
        emits('confirm')
        emits('update:visible', false)
      } else {
        uni.showToast({
          title: '请输入完整金额',
          icon: 'none',
        })
      }
      break
    case '.':
      if (props.value && !props.value.includes('.')) emits('update:value', `${props.value}${key}`)
      break
    default:
      if (!props.value.includes('.')) {
        switch (props.type) {
          case 'digit':
            emits(
              'update:value',
              props.value.length < props.maxlength ? `${props.value}${key}` : props.value,
            )
            break
          case 'password':
            emits('update:value', props.value.length < 6 ? `${props.value}${key}` : props.value)
            if (props.value.length === 5) {
              emits('submit')
              emits('close')
              // popupRef.value.close()
              emits('update:visible', false)
            }
            break
          default:
            break
        }
      } else {
        const parts = props.value.split('.')
        if (parts[1].length < 2) emits('update:value', `${props.value}${key}`)
      }
      break
  }
  if (props.type === 'digit') emits('check')
}
function onFocus() {
  emits('update:visible', true)
}
const showPoup = ref(false)
// 初始化监听数据
watch(
  () => props.visible,
  () => {
    showPoup.value = props.visible
  },
  { deep: true },
)
</script>

<template>
  <view class="input">
    <view v-if="type === 'digit' && props.inputShow" class="value" @click="onFocus">
      {{ value }}
    </view>
    <view v-if="type === 'password'" class="pwd-value flex" @click="onFocus">
      <template v-for="item in 6" :key="item">
        <view class="p-item flex">
          <wd-icon name="keyboard-delete" size="22px"></wd-icon>
        </view>
      </template>
    </view>
  </view>
  <wd-popup
    v-model="showPoup"
    :close-on-click-modal="false"
    lock-scroll
    position="bottom"
    :modal="false"
    :safe-area-inset-bottom="true"
  >
    <view class="keyboard">
      <view v-if="type === 'digit'" class="digit-mode">
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('1')"
        >
          1
        </view>
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('2')"
        >
          2
        </view>
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('3')"
        >
          3
        </view>
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('回退')"
        >
          <wd-icon name="keyboard-delete" size="22px"></wd-icon>
        </view>
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('4')"
        >
          4
        </view>
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('5')"
        >
          5
        </view>
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('6')"
        >
          6
        </view>
        <view
          class="item confirm"
          hover-class="confirm-curr"
          hover-start-time="0"
          hover-stay-time="0"
          :style="{
            backgroundColor: value.charAt(value.length - 1) === '.' ? '#2D69EF' : '#2D69EF',
          }"
          @click="onKeyboard('确定')"
        >
          {{ props.closeText }}
        </view>
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('7')"
        >
          7
        </view>
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('8')"
        >
          8
        </view>
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('9')"
        >
          9
        </view>
        <view
          class="item zero"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('0')"
        >
          0
        </view>
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('.')"
        >
          .
        </view>
      </view>
      <view v-if="type === 'password'" class="password-mode">
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('1')"
        >
          1
        </view>
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('2')"
        >
          2
        </view>
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('3')"
        >
          3
        </view>
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('4')"
        >
          4
        </view>
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('5')"
        >
          5
        </view>
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('6')"
        >
          6
        </view>
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('7')"
        >
          7
        </view>
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('8')"
        >
          8
        </view>
        <view
          class="item"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('9')"
        >
          9
        </view>
        <view class="item empty"></view>
        <view
          class="item zero"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('0')"
        >
          0
        </view>
        <view
          class="item empty"
          hover-class="current"
          hover-start-time="0"
          hover-stay-time="0"
          @click="onKeyboard('回退')"
        >
          <wd-icon name="keyboard-delete" size="22px"></wd-icon>
        </view>
      </view>
    </view>
  </wd-popup>
</template>

<style lang="scss" scoped>
//
:deep(.custom-class-popup) {
  @apply overflow-hidden rounded-t-0px px-0px;
}
.input {
  flex: 1;
  .value {
    flex: 1;
    font-size: 72rpx;
    font-weight: 600;
    line-height: 1;
  }
  .pwd-value {
    flex: 1;
    align-items: center;
    justify-content: center;
    .p-item {
      align-items: center;
      justify-content: center;
      width: 80rpx;
      height: 80rpx;
      margin-right: 12rpx;
      background-color: v-bind(background);
      border-radius: 8rpx;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.keyboard {
  padding: 18rpx;
  padding-bottom: calc(18rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(18rpx + env(safe-area-inset-bottom));
  background-color: #f6f6f6;
  border-top: 1px solid #ececec;
  .digit-mode {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(4, 1fr);
    gap: 18rpx;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 18rpx 0;
      font-size: 36rpx;
      font-weight: 600;
      color: #222;
      background-color: #fff;
      border-radius: 10rpx;
      &.zero {
        grid-column: span 2;
      }
      &.confirm {
        grid-row: span 3;
        font-size: 28rpx;
        color: #fff;
        background-color: #57be6b;
      }
      &.current {
        background-color: #d7d7d7;
      }
      &.confirm-curr {
        background-color: #6bee88;
      }
    }
  }
  .password-mode {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 18rpx;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 18rpx 0;
      font-size: 36rpx;
      font-weight: 600;
      color: #222;
      background-color: #fff;
      border-radius: 10rpx;
      &.empty {
        background-color: rgba(0, 0, 0, 0);
      }
      &.current {
        background-color: #d7d7d7;
      }
    }
  }
}
</style>
