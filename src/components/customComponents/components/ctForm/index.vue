<script>
export default {
  name: 'ctForm',
  functional: true,
  render(h, context) {
    console.log(h, context, 'context')


    function SetElFormItem(fromOptions) {
      const { formModel, formItemList } = fromOptions
      if (!formItemList || !formItemList.length) {
        return []
      }
      let domNodes = formItemList.map(item => {
        return h('el-form-item', {
          props: {
            ...item.props,
            prop: item.prop,
            label: item.label
          },
          attrs: {
            ...item.attrs,
          },
          on: {
            ...item.callback
          }
        }, [SetInputHandler(item, formModel)])
      })
    }
    function SetInputHandler(item, formModel) {
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



    return h('el-form', {
      ref: context.data.ref,
      props: context.props,
      attrs: context.props,
      on: {
        ...context.props.elFormHandler,
      }
    }, SetElFormItem(context.data.fromOptions))

  }
}
</script>
