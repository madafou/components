<script>
export default {
  name: 'ctForm',
  functional: true,
  render(h, context) {
    // console.log(context,'context')
    let { fileds, button } = context.props.fromData
    let ref = context.data.ref
    /**
     * 获取el-form-item
     */
    function SetElFormItem() {
      let itemData = []
      if (fileds && JSON.stringify(fileds) != '{}') {
        for (const key in fileds) {
          itemData.push(

            h('el-form-item', {
              props: {
                ...(fileds[key] && fileds[key].elFormItemProps || {}),
                prop: key,
                label: fileds[key] && fileds[key]['label'] || ''
              },
              attrs: {
                ...(fileds[key] && fileds[key].elFormItemProps || {}),
                class: 'el-form-item el-form-item--medium ' + (fileds[key] && fileds[key].elFormItemProps && fileds[key].elFormItemProps.class || ''),
              },
              on: (fileds[key].elFromItemChlidRenHandler && fileds[key].elFromItemChlidRenHandler || {}),
            }, [ByTypeCorrespondItem(key, fileds[key])])
          )
        }
      }
      if (button && button.length > 0) {
        //  Button 单独拆出来
        itemData.push(
          h('el-form-item', {
            attrs: { class: 'el-form-item el-form-item--medium footer-button' }
          }, SetButton(button))
        )
      }
      return itemData
    }
    /**
     * 往里插入对应的input 输入框  或者其他的类型 
     */
    function ByTypeCorrespondItem(key, scoped) {

      if (scoped.type == 'input') {
        context.props.data[key] = context.props.data && context.props.data[key] || ''
        return SetInputHandler(key, scoped)
      } else if (scoped.type == 'select') {
        context.props.data[key] = context.props.data && context.props.data[key] || null
        return SetSelect(key, scoped, scoped.type)
      } else if (scoped.type == 'checkbox-group') {
        context.props.data[key] = context.props.data && context.props.data[key] || []
        return SetCheckBoxGroup(key, scoped, scoped.type)
      } else if (scoped.type == 'checkbox') {
        context.props.data[key] = context.props.data && context.props.data[key] || ''
        return SetCheckBoxOnce(key, scoped, scoped.type)
      }
    }
    // 设置input 需要设置 input 事件 
    function SetInputHandler(key, scoped) {
      return h('el-input', {
        //  新增的属性 未增加上去  问题1 
        props: {
          ...(scoped.elFromItemChlidRenProps && scoped.elFromItemChlidRenProps || {}),
          value: context.props.data[key],
          prop: key,
        },
        attrs: {
          ...(scoped.elFromItemChlidRenProps && scoped.elFromItemChlidRenProps || {}),
        },
        on: {
          input: (e) => {
            context.props.data[key] = e
          },
          ...(scoped.elFromItemChlidRenHandler && scoped.elFromItemChlidRenHandler || {}),
        },
        nativeOn: {
          input(e) {
            context.props.data[key] = e.target.value
          },
        }
      })
    }
    // 设置change 事件 需要设置 input 事件 
    function SetChangeHandler(key, scoped, type, handler) {
      let types = 'el-' + type
      return h(types, {
        //  新增的属性 未增加上去  问题1 
        props: {
          ...(scoped.elFromItemChlidRenProps && scoped.elFromItemChlidRenProps || {}),
          value: context.props.data[key],
          prop: key,
        },
        attrs: {
          ...(scoped.elFromItemChlidRenProps && scoped.elFromItemChlidRenProps || {}),
        },
        on: {
          change: (e) => {
            context.props.data[key] = e
          },
          ...(scoped.elFromItemChlidRenHandler && scoped.elFromItemChlidRenHandler || {}),
        },
        nativeOn: {
          change: (e) => {
            if (type === 'checkbox-group') {
              context.props.data[key] = context.props.data && context.props.data[key] || []
              context.props.data[key] = Array.isArray(context.props.data[key]) && context.props.data[key] || []
              if (context.props.data[key].indexOf(e.target._value) != -1) {
                context.props.data[key].splice(context.props.data[key].indexOf(e.target._value), 1)
              } else {
                context.props.data[key].push(e.target._value)
              }
            } else {
              context.props.data[key] = e.target.value
            }


          }
        }
      }, handler(scoped))
    }
    // 设置复选框选择
    function SetCheckBoxGroup(key, scoped, type) {

      return SetChangeHandler(key, scoped, type, SetCheckBox)
    }
    // 设置 复选框的选择问题 
    function SetCheckBox(scoped) {
      // console.log(SetOptions(scoped.options))
      let { label, value } = SetOptions(scoped.options)
      let checkboxList = []
      if (scoped.itemList && Array.isArray(scoped.itemList)) {
        scoped.itemList.forEach(element => {
          checkboxList.push(
            h('el-checkbox', {
              //  新增的属性 未增加上去  问题1 
              props: {
                label: element[value] && element[value].toString() || '',
                disabled: element.disabled || false
              },
            }, element[label])
          )
        })
      }
      return checkboxList
    }
    // 设置按钮
    function SetButton(scoped) {
      let buttonList = []
      if (scoped && Array.isArray(scoped)) {
        scoped.forEach(element => {
          buttonList.push(
            h('el-button', {
              //  新增的属性 未增加上去  问题1 
              attrs: (element.elFormItemProps && element.elFormItemProps || {}),
              props: (element.elFormItemProps && element.elFormItemProps || {}),
              on: {
                click: () => {
                  element.callback()
                }
              },

            }, element.text)
          )
        });
      }
      return buttonList
    }
    // 设置select  选择框
    function SetSelect(key, scoped, type) {

      return SetChangeHandler(key, scoped, type, SetSelectItem)
    }
    // 设置select-item  选择框
    function SetSelectItem(scoped) {

      let { label, value } = SetOptions(scoped.options)
      let selectItemList = []
      if (scoped.itemList && Array.isArray(scoped.itemList)) {
        scoped.itemList.forEach((element, index) => {
          selectItemList.push(
            h('el-option', {
              //  新增的属性 未增加上去  问题1 
              props: {
                key: 'select' + index,
                label: element[label],
                value: element[value],
                disabled: element.disabled || false
              },
            })
          )
        })
      }
      return selectItemList
    }
    // 设置单独的  checkbox  用处不大  建议使用 checkbox-group
    function SetCheckBoxOnce(key, scoped, type) {
      let types = 'el-' + type
      let { options } = scoped
      if (!options) {
        options = { name: '' }
      }
      return h(types, {
        //  新增的属性 未增加上去  问题1 
        props: {
          value: context.props.data[key],
          label: scoped[options.name] && scoped[options.name].toString() || '',
          disabled: scoped.disabled || false
        },
        attrs: {
          ...(scoped.elFromItemChlidRenProps && scoped.elFromItemChlidRenProps || {}),
        },
        on: {
          change: (e) => {
            // console.log(e)
            context.props.data[key] = e
          },
          ...(scoped.elFromItemChlidRenHandler && scoped.elFromItemChlidRenHandler || {}),
        },
      }, scoped[options.name])
    }
    // 设置options
    function SetOptions(options) {

      let obj = { label: 'label', value: 'value', name: 'label' }
      if (!options) return obj
      if (Object.prototype.toString.call(options).indexOf('object') == -1) return obj
      if (Object.keys.length === 0) return obj
      return options
    }
    return h('el-form', {
      ref,
      attrs: context.props.elFormProps,
      props: context.props.elFormProps,
      on: {
        ...context.props.elFormHandler,

      }
    }, SetElFormItem())
  }
}
</script>
