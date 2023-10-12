/**
 * options 入参
 */

export const renderHeader = (h, column, headerOptions) => {
        console.log(headerOptions, 'optionsUtils')
        const { type = 'tooltip', tooltipIcon = 'el-icon-question', slot = null, attr = {}, event = {} } = headerOptions
        let slotInnerDom = {
            domProps: {
                innerHTML: '测试显示内容<br /> 张三'
            }
        }
        if (type === 'tooltip') {
            slotInnerDom.slot = 'content'
            let slotDom = slot && [h('div', slotInnerDom)] || []
            return h('div', {
                style: {
                    display: 'inline-block'
                },
                on: {
                    click: e => {
                        e.stopPropagation(); // 组织 冒泡事件
                    }
                }
            }, [
                h('span', column.label),
                h('el-tooltip', {
                    props: {
                        ...attr
                    }
                }, [
                    ...slotDom,
                    h('i', {
                        class: tooltipIcon
                    })
                ]),
            ])
        } else if (type === 'popover') {
            let slotDom = slot && [h('div', slotInnerDom)] || []
            return h('div', {
                style: {
                    display: 'inline-block'
                },
                on: {
                    click: e => {
                        e.stopPropagation(); // 组织 冒泡事件
                    }
                }
            }, [
                h('span', column.label),
                h('el-popover', {
                    props: {
                        trigger: attr.trigger || 'hover',
                        ...attr
                    },
                    on: {
                        ...event
                    }
                }, [
                    ...slotDom,
                    h('i', {
                        slot: 'reference',
                        class: 'el-icon-question'
                    })
                ])
            ])
        }

    }
    // 处理from 表单的数据处理 
    // const elFrom = (h, options) => {
    //     const model = {}
    //     let dom = options.map(item => {
    //         if () {

//         }
//     })
//     return h('el-form', {
//         props: {
//             model: '',
//         }
//     }, [

//     ])
// }









// 只是鼠标hover 的时候展示
// export const renderHeader = (h, column, options, filtersOptions) => {
//     console.log(options, filtersOptions, 'optionsUtils')
//     const { type = 'tooltip', tooltipIcon = 'el-icon-question', slot = null, attr = {}, event = {} } = options
//     let slotInnerDom = {
//         domProps: {
//             innerHTML: '测试显示内容<br /> 张三'
//         }
//     }
//     if (type === 'tooltip') {
//         slotInnerDom.slot = 'content'
//         let slotDom = slot && [h('div', slotInnerDom)] || []
//         return h('div', {
//             style: {
//                 display: 'inline-block'
//             },
//             on: {
//                 click: e => {
//                     e.stopPropagation(); // 组织 冒泡事件
//                 }
//             }
//         }, [
//             h('span', column.label),
//             h('el-tooltip', {
//                 props: {
//                     ...attr
//                 }
//             }, [
//                 ...slotDom,
//                 h('i', {
//                     class: tooltipIcon
//                 })
//             ]),
//         ])
//     } else if (type === 'popover') {
//         let slotDom = slot && [h('div', slotInnerDom)] || []
//         return h('div', {
//             style: {
//                 display: 'inline-block'
//             },
//             on: {
//                 click: e => {
//                     e.stopPropagation(); // 组织 冒泡事件
//                 }
//             }
//         }, [
//             h('span', column.label),
//             h('el-popover', {
//                 props: {
//                     trigger: attr.trigger || 'hover',
//                     ...attr
//                 },
//                 on: {
//                     ...event
//                 }
//             }, [
//                 ...slotDom,
//                 h('i', {
//                     slot: 'reference',
//                     class: 'el-icon-question'
//                 })
//             ])
//         ])
//     }

// }