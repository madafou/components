import ctTable from './components/ctTable'
import ctTableColumn from './components/ctTableColumn'
// import ctForm from './components/ctForm'

const components = [
    ctTable,
    ctTableColumn,
    // ctForm
]

const install = function(Vue) {
        components.forEach(component => {
            Vue.component(component.name, component);
        });
    }
    /* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
}