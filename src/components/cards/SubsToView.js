import React from 'react';
import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';
import moment from 'moment';

const SubsToView = ({ subscriptions }) => {
  const DurationRenderer = ({ duration }) => {
    let length;
    if (duration === 30) {
      length = 'One month';
    } else if (duration === 180) {
      length = 'Six months';
    } else if (duration === 365) {
      length = 'One year';
    } else {
      length = 'Invalid duration';
    }

    return <span>{length}</span>;
  };
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          ~ {new Date().toLocaleString()} ~
        </Text>
        <Text style={styles.title}>List of Subscriptions</Text>
        <Text style={styles.author}>www.loveisincyprus.com</Text>

        {subscriptions.map((subscription) => (
          <View key={subscription._id} style={styles.container}>
            <View style={styles.column}>
              <Text style={styles.subtitle}>Members Info:</Text>
              <Text style={styles.text}>
                <Text>Name: {subscription.userInfo.name}</Text>
                {'\n'}
                <Text>Username: {subscription.userInfo.username}</Text>
                {'\n'}
                <Text>Email: {subscription.userInfo.email}</Text>
                {'\n'}
                <Text>
                  IP(s): {subscription.userInfo.ipAddresses.join(', ')}
                </Text>
                {'\n'}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.subtitle}>Subscription Info:</Text>
              <Text style={styles.text}>
                <Text>Amount: €{subscription.cost}</Text>
                {'\n'}
                <Text>
                  Duration:{' '}
                  <DurationRenderer duration={subscription.duration} />
                </Text>
                {'\n'}
                <Text>
                  Start date:{' '}
                  {moment(subscription.startDate).format('MMMM Do YYYY')}
                </Text>
                {'\n'}
                <Text>
                  Expiry date:{' '}
                  {moment(subscription.expiryDate).format('MMMM Do YYYY')}
                </Text>
                {'\n'}
                <Text>
                  Trial period: {subscription.trialPeriod ? 'Yes' : 'No'}
                </Text>
                {'\n'}
                <Text>
                  Payment type:{' '}
                  {subscription.paymentType.charAt(0).toUpperCase() +
                    subscription.paymentType.slice(1)}
                </Text>
                {'\n'}
              </Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  container: {
    flexDirection: 'row',
    border: '1px solid #000',
    padding: '10px',
    marginBottom: '10px',
  },
  column: {
    flex: 1,
    padding: '10px',
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    marginLeft: 12,
    fontSize: 14,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  footer: {
    padding: '100px',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

export default SubsToView;
