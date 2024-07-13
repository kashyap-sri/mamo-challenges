// react imports
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';

// third-party imports
import InfiniteScroll from 'react-infinite-scroll-component';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress } from '@mui/material';

// in-app imports
import { apiRequest } from '../../redux/root/actions';
import { PAYMENTS_APIS } from '../api/endpoints';

const Expenses = () => {
    const dispatch = useDispatch();

    const [isMore, setIsMore] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const expenses = useSelector(state => state?.root?.expenses);

    const getExpenses = async (page=1, limit=10) => {
        const expensesRes = await dispatch(
            apiRequest(
                PAYMENTS_APIS.getExpenses,
                `?page=${page}&limit=${limit}`
            )
        )
    };
    
    const loadMoreItems = () => {
        getExpenses(page + 1, limit);
    }

    const getHeaders = () => {
        if (!expenses?.length) return [];
        return Object.keys(expenses?.[0]);
    };

    const getValue = (value) => {
        if (value === true) return 'yes';
        if (value === false) return 'no';
        return value;
    };

    useEffect(() => {
        getExpenses();
    }, []);

    return (
        <div className="expenses">
            <Header />
            <div className="expense__body">
                <InfiniteScroll
                    dataLength={expenses?.length}
                    next={loadMoreItems}
                    hasMore={isMore}
                    loader={<><CircularProgress /></>}
                    endMessage={<p>No more expenses to load.</p>}
                >
                    <div className="expenses__table">
                        <TableContainer
                            component={Paper}
                            style={{
                                overflow: 'hidden'
                            }}
                        >
                            <Table sx={{ minWidth: '100%' }} style={{ tableLayout: 'auto' }} aria-label="simple table">
                            <TableHead>
                                <TableRow
                                    style={{
                                        backgroundColor: '#1f1f1f',
                                        color: '#ffffff'
                                    }}
                                >
                                    {
                                        getHeaders()?.map(
                                            (item, index) => {
                                                return (
                                                    <TableCell
                                                        key={`expense-header-${index}`}
                                                        style={{
                                                            color: '#ffffff',
                                                            minWidth: '150px'
                                                        }}
                                                        align="right"
                                                    >
                                                        {item}
                                                    </TableCell>
                                                );
                                            }
                                        )
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {expenses.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {
                                        getHeaders()?.map(
                                            (header, index) => (
                                                <TableCell align="right">{getValue(row?.[header])}</TableCell>
                                            )
                                        )
                                    }
                                    
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default Expenses;
