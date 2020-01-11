import React from 'react';
import './Table.css';

function Table(props) {
  return (
    <div className="tableContent">
        <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>Card Number</th>
                <th>Balance</th>
                <th>Limit</th>
                </tr>
            </thead>
            <tbody>
            {props.data.length ? props.data.map((item, i) => (
                    <tr key={i}>
                        <td>
                            {item.name}
                        </td>
                        <td>
                            {item.card}
                        </td>
                        <td>
                         £0
                        </td>
                        <td>
                            {item.limit}
                        </td>
                    </tr>
                )
            ): <tr>
                <td colSpan="4" className="no-data">No records</td>
                </tr>}
            </tbody>
            

        </table>
      
    </div>
  );
}

export default Table;
