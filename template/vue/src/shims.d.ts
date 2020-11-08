declare module '*.vue' {

  import Vue from 'vue'
  export default Vue
}

// declare module '*.tsx' {
//   export default Vue
// }

declare namespace JSX {
  interface IntrinsicElements {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
}
