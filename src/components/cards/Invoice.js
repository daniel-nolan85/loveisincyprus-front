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

const Invoice = ({ order }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ {new Date().toLocaleString()} ~
      </Text>
      <Text style={styles.title}>Order Invoice</Text>
      <Text style={styles.author}>Love is in Cyprus</Text>
      <Text style={styles.subtitle}>Products Summary:</Text>

      <Table>
        <TableHeader>
          <TableCell>Product</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
        </TableHeader>
      </Table>
      <Table data={order.products}>
        <TableBody>
          <DataTableCell getContent={(x) => x.product.title} />
          <DataTableCell getContent={(x) => `€${x.product.price}`} />
          <DataTableCell getContent={(x) => x.count} />
        </TableBody>
      </Table>

      <Text style={styles.subtitle}>Delivery Address:</Text>
      <Text style={styles.text}>
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
          {/* {new Date(order.paymentIntent.created * 1000).toLocaleString()} */}
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

        <Text>
          Total Paid: {'       '}€{order.paymentIntent.amount}
        </Text>
      </Text>

      <Text style={styles.footer}>~ Thank you for shopping with us ~</Text>
    </Page>
  </Document>
);

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
