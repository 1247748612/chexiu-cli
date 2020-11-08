import JsxComponent from '@/components/JsxComponent/index'
import { Component, Vue } from 'vue-property-decorator'

const HelloWorld = (props: any) => {
  console.log('props', props)
  return (
    <div>
      <h1>展示怎么使用jsx语法，用tsx格式的文件 </h1>
      {props.hello}{<JsxComponent></JsxComponent>}
    </div>
  )
}

@Component({})
export default class JsxPage extends Vue {
  render() {
    console.log(HelloWorld)
    return <HelloWorld hello={'hello'}></HelloWorld>
  }
}

