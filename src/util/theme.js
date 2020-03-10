//import { NEG_ONE } from "long";

export default {
    palette: {
      primary: {
        light: '#8eacbb',
        main: '#607d8b',
        dark: '#34515e',
        contrastText: '#fafafa',
      },
      secondary: {
        light: '#efefef',
        main: '#bdbdbd',
        dark: '#8d8d8d',
        contrastText: '#000000',
      }
    },
    spreadableObject: {
      invisibleSeparator : {
        border: 'none',
        margin: 4
      },
      visibleSeparator: {
       width: '100%',
       borderBottom: '1px solid rgba(0,0,0,0.1)',
       marginBottom: 20
      },
      typography : {
      useNextVariants : true
    },
    pageTitle: {},
form: {
    textAlign: 'center'
},
image: {},
textField: {margin:'10px auto 10px auto'},
button: {position: 'relative'},
customError: {color: 'red', fontSize : '.8rem', margin: 15},
spinner: {}
    }
  }