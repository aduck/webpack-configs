import React,{Component} from 'react'
import config from './config'
import styles from './box.css'

class Box extends Component{
  render(){
    return (
      <div className={styles.box}>
        {config.keys}
      </div>
    );
  }
}

export default Box