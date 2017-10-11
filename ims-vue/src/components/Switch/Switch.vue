<template lang="pug">
  span.v-switch(@click="toggle",
   :class="{'v-switch-checked': check, 'v-switch-disabled': disabled}",
   :tabIndex="!!tabIndex ? tabIndex : ''")
    span.v-switch-inner {{ check ? checkValue : unCheckValue}}
</template>

<script>
  export default {
    name: 'switch',
    data () {
      return {
        check: this.checked
      }
    },
    props: {
      className: {
        type: String,
        default: ''
      },
      checked: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      tabIndex: {
        type: [Number, String]
      },
      checkValue: {
        type: String
      },
      unCheckValue: {
        type: String
      }
    },
    methods: {
      toggle () {
        this.setChecked()
        this.$emit('onClick', this.check)
      },
      setChecked () {
        if (this.disabled) {
          return
        }
        this.check = !this.check
      }
    }
  }
</script>

<style lang="scss">
  .v-switch{
    display: inline-block;
    position: relative;
    min-width: 44px;
    height: 22px;
    line-height: 20px;
    vertical-align: middle;
    box-sizing: border-box;
    border: 1px solid #f8f8f8;
    border-radius: 20px;
    background-color: rgba(0,0,0,.25);
    cursor: pointer;
    transition: all .3s cubic-bezier(0.35, 0, 0.25, 1);

    &-inner{
      display: block;
      margin-left: 24px;
      margin-right: 6px;
      color: #fff;
      font-size: 12px;
      user-select: none;
    }

    &:after{
      content: '';
      position: absolute;
      top: 1px;
      left: 2px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background-color: #fff;
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0, 0, 0, .26);
      transform: scale(1);
      transition: all .3s cubic-bezier(0.35, 0, 0.25, 1);
      animation: vSwitchOff .3s cubic-bezier(0.35, 0, 0.25, 1);
    }

    &:hover:after{
      transform: scale(1.1);
      animation-name: vSwitchOn;
    }

    &:focus{
      box-shadow: 0 0 0 2px tint(#2db7f5, 80%);
      outline: none;
    }

    &-checked{
      border: 1px solid #108ee9;
      background-color: #108ee9;

      .v-switch-inner{
        margin-right: 24px;
        margin-left: 6px;
      }

      &:after{
        left: 100%;
        margin-left: -19px;
      }

    }

    &-disbaled{
      background-color: #ccc;
      border-color: #ccc;
      cursor: no-drop;

      &:after{
        background-color: #9e9e9e;
        animation-name: none;
      }

      &:hover:after{
        transform: scale(1);
        animation-name: none;
      }

    }

    &-label{
      display: inline-block;
      padding-left: 10px;
      line-height: 20px;
      vertical-align: middle;
      font-size: 14px;
      white-space: normal;
      pointer-events: none;
      user-select: text;
    }

  }

  @keyframes vSwitchOn{
    0%{
      transform: scale(1);
    }
    50%{
      transform: scale(1.25);
    }
    100%{
      transform: scale(1.1);
    }
  }

  @keyframes vSwitchOff{
    0%{
      transform: scale(1.1);
    }
    100%{
      transform: scale(1);
    }
  }

</style>
