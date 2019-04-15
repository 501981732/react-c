import React from 'react';

export default class DetailPage extends React.PureComponent {

  onBack = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.titleText}>This is DetailPage</h1>
        <div style={styles.btnGroup}>
          <div onClick={this.onBack}>return</div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    padding: '0 20px',
    backgroundColor: '#80D4AC'
  },
  titleText: {
    paddingTop: 20,
    color: '#FFF',
    textAlign: 'center'
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  }
}