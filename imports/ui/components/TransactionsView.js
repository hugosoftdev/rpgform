// /* eslint-disable max-len */
// /* eslint linebreak-style: ["error", "windows"] */
// import React from 'react';
// import { PropTypes } from 'prop-types';
// import { Row, Col, Modal, Button } from 'react-bootstrap';
// import TableView from './TableView.js';
// import TransactionsSummaryContainer from '../containers/TransactionsSummary';
// import ComandaModalContainer from '../containers/ComandaModal.js';
// /**
//  * Uma view onde os profissionais e o dono do salão conseguem ver detalhes sobre todas as transações feitas referentes a cada professional ou ao salão como um todo.
//  * Caso seja um profissionais acessando essa view (sem ter id de dono ou de gestor), ele terá acesso somente aos detalhes das transações relacionadas a ele.
//  */
//
// export default class TransactionsView extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       noData: false,
//       selectedComandaId: null,
//       selectedTransactionAmount: 0,
//     };
//     this.returnSummary = this.returnSummary.bind(this);
//     this.renderComanda = this.renderComanda.bind(this);
//     this.closeModal = this.closeModal.bind(this);
//   }
//
//  /**
//   * Mostra a comanda relativa a transação
//   * @return {null}
//   */
//   renderComanda(transaction) {
//     const selectedTransaction = this.props.rawTransactions.filter(a => a.id === transaction.id)[0];
//
//     let selectedComandaId = transaction.metadata.comanda_id;
//     if (!selectedComandaId) {
//       selectedComandaId = '';
//     }
//     this.setState({
//       selectedComandaId,
//       selectedTransaction,
//       selectedTransactionAmount: transaction.amount,
//     });
//   }
//
//   // Closes modal shown when canceling comanda
//   closeModal() {
//     this.setState({ selectedComandaId: null });
//   }
//
//   /**
//    * Retorna o sumário responsavel por mostrar o total liquido faturado pela opção selecionada e mostra sempre o número de transações feitas pelo salão, independente da opção selecionada.
//    * @return {ReactElement} sumário
//    */
//   returnSummary() {
//     return (
//       <Row>
//         <TransactionsSummaryContainer
//           recipientToFilter={this.props.recipientToFilter}
//           transferInfo={this.props.transferInfo}
//           transactions={this.props.rawTransactions}
//         />
//       </Row>
//
//     );
//   }
//
//  /**
//   * Renderiza o principal elemento dessa janela, a tabela de transações
//   * @return {ReactElement} table
//   */
//   render() {
//     return (
//       <div className='transactions-view-container'>
//         {this.returnSummary()}
//         <Row>
//           <Col xs={12} md={12}>
//             <TableView
//               columnMetadata={this.props.columnMetadata}
//               columns={this.props.columns}
//               data={this.props.transactions}
//               filterPlaceholderText={' Pesquisar transação'}
//               rowClickCallback={this.renderComanda}
//               nextText={'Seguinte'}
//               noDataMessage={'Não há transações disponíveis.'}
//               previousText={'Anterior'}
//               resultsPerPage={10}
//           />
//           </Col>
//         </Row>
//         <Modal
//           show={this.state.selectedComandaId !== null}
//           onHide={this.closeModal}
//           className='comanda-modal'>
//           <Modal.Header closeButton>
//             <Modal.Title>Comanda</Modal.Title>
//           </Modal.Header>
//           <Modal.Body className='comanda-container'>
//             <ComandaModalContainer
//               comandaId={this.state.selectedComandaId}
//               transaction={this.state.selectedTransaction}
//               transactionAmount={this.state.selectedTransactionAmount}
//           />
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={this.closeModal}>Fechar</Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     );
//   }
// }
//
// TransactionsView.propTypes = {
//   transactions: PropTypes.array.isRequired,
//   columns: PropTypes.array.isRequired,
//   columnMetadata: PropTypes.array,
//
//   transferInfo: PropTypes.object.isRequired,
//   recipientToFilter: PropTypes.string,
//   rawTransactions: PropTypes.array,
// };
