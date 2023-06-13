import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
} from '@react-pdf/renderer';
import Logo from '../../assets/logo.png';

const Chart = ({ userDataImage, chartImage }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Link src='https://www.loveisincyprus.com/'>
          <Image src={Logo} style={styles.logo} />
        </Link>
        <Image src={userDataImage} />
        <Image src={chartImage} />
        <Text style={styles.footer}>
          <Link style={styles.link} src='https://www.loveisincyprus.com/'>
            www.loveisincyprus.com
          </Link>{' '}
          &copy; {new Date().getFullYear()}
        </Text>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  footer: {
    fontSize: 10,
    marginTop: 10,
    marginBottom: 10,
    color: '#626262',
  },
  link: {
    color: '#ef5b85',
    textDecoration: 'none',
  },
});

export default Chart;
