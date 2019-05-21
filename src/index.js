import React, { Component } from "react";
import PropTypes from "prop-types";
import Pagination from "react-js-pagination";

import "./sayur.css";

const StatusRow = props => {
    const { colSpan, message } = props;
    return (
        <tr>
            <td colSpan={colSpan} className="text-center">
                {message}
            </td>
        </tr>
    );
};

StatusRow.propTypes = {
    colSpan: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired
};

const RowCell = props => {
    const { row, col } = props;
    if (col.formatter) return <td>{col.formatter(row)}</td>;
    return <td>{row[col.key]}</td>;
};

RowCell.propTypes = {
    row: PropTypes.object.isRequired,
    col: PropTypes.object.isRequired
};

class SayurTable extends Component {
    constructor(props) {
        super(props);
        const { page } = this.props;
        this.state = { page, sortBy: "", desc: false };
    }

    handlePageChange = pageNumber => {
        this.setState({ page: pageNumber });
        this.props.onPageChanged({ currentPage: pageNumber });
    };

    handleSort = ({ row, desc }) => {
        this.setState({
            sortBy: row.key,
            desc: !desc
        });
        this.props.onSort({
            sortBy: row.key,
            desc: !desc
        });
    };

    renderBody = ({ loading, rows, columns, networkStatus }) => {
        if (loading) {
            return (
                <StatusRow
                    message={"Loading ..."}
                    colSpan={columns.length + 1}
                />
            );
        } else if (networkStatus == 8) {
            return (
                <StatusRow message={"Error ..."} colSpan={columns.length + 1} />
            );
        } else {
            if (!rows || rows.length == 0) {
                return (
                    <StatusRow
                        message={"No Data"}
                        colSpan={columns.length + 1}
                    />
                );
            } else {
                return rows.map((row, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        {columns.map((col, index) => (
                            <RowCell key={index} row={row} col={col} />
                        ))}
                    </tr>
                ));
            }
        }
    };

    renderSortIcons = ({ key }) => {
        const { sortBy, desc } = this.state;
        if (key == sortBy && desc) {
            return <i className="sort-by-desc" style={{ float: "right" }} />;
        } else if (key == sortBy && !desc) {
            return <i className="sort-by-asc" style={{ float: "right" }} />;
        } else {
            return (
                <span className="pull-right" style={{ float: "right" }}>
                    <i className="sort-by-desc" /> <i className="sort-by-asc" />{" "}
                </span>
            );
        }
    };

    renderColumnHeader = ({ columns }) => {
        const { desc } = this.state;
        return columns.map((row, index) => {
            if (row.sortable) {
                return (
                    <th
                        key={index}
                        onClick={() => this.handleSort({ row, desc })}
                        style={{ color: "white", cursor: "pointer" }}
                    >
                        <strong>
                            {this.renderSortIcons({ key: row.key })}
                            {row.label}
                        </strong>
                    </th>
                );
            } else
                return (
                    <th key={index}>
                        <strong>{row.label}</strong>
                    </th>
                );
        });
    };

    render() {
        const {
            loading,
            columns,
            rows,
            page,
            elements,
            total,
            networkStatus,
            refetch
        } = this.props;
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="form-inline">
                        {refetch ? (
                            <button
                                style={{ float: "left", margin: "0" }}
                                onClick={() => refetch()}
                                className="btn btn-default btn-sm"
                            >
                                <i className="fa fa-refresh" />
                            </button>
                        ) : null}
                        <Pagination
                            innerClass={"pagination pagination-margin"}
                            activePage={this.state.page}
                            itemsCountPerPage={elements}
                            totalItemsCount={total}
                            onChange={this.handlePageChange}
                        />
                    </div>
                </div>
                <table
                    className="table table-condensed table-striped"
                    style={{ border: "1px #9CB93B solid" }}
                >
                    <thead>
                        <tr
                            style={{
                                backgroundColor: "#9CB93B",
                                color: "white"
                            }}
                        >
                            <th>No</th>
                            {this.renderColumnHeader({ columns })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBody({
                            loading,
                            rows,
                            columns,
                            networkStatus
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

SayurTable.propTypes = {
    loading: PropTypes.bool,
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    limit: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    elements: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    totalPage: PropTypes.number.isRequired,
    refetch: PropTypes.func,
    networkStatus: PropTypes.number,
    onPageChanged: PropTypes.func,
    onSort: PropTypes.func
};

export default SayurTable;
