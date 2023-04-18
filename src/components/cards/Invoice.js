import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from '@david.kucsai/react-pdf-table';
import moment from 'moment';

const Invoice = ({ order }) => {
  console.log('order => ', order);
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          ~ {new Date().toLocaleString()} ~
        </Text>
        <Text style={styles.title}>Order Invoice</Text>
        <Text style={styles.author}>www.loveisincyprus.com</Text>
        <Text style={styles.subtitle}>Products Summary:</Text>

        <Table>
          <TableHeader>
            <TableCell style={{ padding: 10 }}>Product</TableCell>
            <TableCell style={{ padding: 10 }}>Price</TableCell>
            <TableCell style={{ padding: 10 }}>Quantity</TableCell>
          </TableHeader>
        </Table>
        <Table data={order.products}>
          <TableBody>
            <DataTableCell
              getContent={(x) => x.product.title}
              style={{ padding: 10 }}
            />
            <DataTableCell
              getContent={(x) => `€${x.product.price}`}
              style={{ padding: 10 }}
            />
            <DataTableCell
              getContent={(x) => x.count}
              style={{ padding: 10 }}
            />
          </TableBody>
        </Table>

        <Text style={styles.subtitle}>Ordered By:</Text>
        <Text style={styles.text}>
          <Text>
            Username: {'      '}
            {order.orderedBy.username}
          </Text>
          {'\n'}
          <Text>
            Email: {'              '}
            {order.orderedBy.email}
          </Text>
          {'\n'}
        </Text>

        <Text style={styles.subtitle}>Deliver To:</Text>
        <Text style={styles.text}>
          <Text>{order.deliverTo}</Text>
          {'\n'}
          <Text>{order.deliveryAddress.firstLine}</Text>
          {'\n'}
          <Text>{order.deliveryAddress.secondLine}</Text>
          {'\n'}
          <Text>{order.deliveryAddress.city}</Text>
          {'\n'}
          <Text>{order.deliveryAddress.state}</Text>
          {'\n'}
          <Text>{order.deliveryAddress.zip}</Text>
          {'\n'}
          <Text>{order.deliveryAddress.country}</Text>
        </Text>

        <Text style={styles.subtitle}>Order Details:</Text>
        <Text style={styles.text}>
          <Text>
            Date: {'               '}
            {moment(order.paymentIntent.created).format('MMMM Do YYYY')}
          </Text>
          {'\n'}
          <Text>
            Order ID: {'         '}
            {order.paymentIntent.id}
          </Text>
          {'\n'}
          <Text>
            Order Status: {'  '}
            {order.orderStatus}
          </Text>
          {'\n'}
          {order.discount && (
            <>
              <Text>
                Discount: {'         '}€{parseFloat(order.discount).toFixed(2)}
              </Text>
              {'\n'}
            </>
          )}
          {'\n'}
          <Text>
            Delivery Fee: {'   '}€{parseFloat(order.deliveryFee).toFixed(2)}
          </Text>
          {'\n'}
          <Text>
            Total Paid: {'       '}€{order.paymentIntent.amount}
          </Text>
        </Text>

        <Text style={styles.footer}>~ Thank you for shopping with us ~</Text>
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
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
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

export default Invoice;
