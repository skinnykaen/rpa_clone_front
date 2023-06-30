import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface WithPaginationProps {
    page: number;
    pageSize: number;
    onChangePage(page: number): void;
}

export function withPaginationLocal<T extends WithPaginationProps = WithPaginationProps>(
    WrappedComponent: React.ComponentType<T>,
    pageSize: number,
) {
    return (hocProps: Omit<T, keyof WithPaginationProps>) => {
        const [page, setPage] = useState(0);
        const onChangePage = (page: number) => setPage(page);
        return (
            <WrappedComponent
                {...(hocProps as T)}
                page={page}
                pageSize={pageSize}
                onChangePage={onChangePage}
            />
        );
    };
}

export function withPaginationUrl<T extends WithPaginationProps = WithPaginationProps>(
    WrappedComponent: React.ComponentType<T>,
    pageSize: number,
) {
    return (hocProps: Omit<T, keyof WithPaginationProps>) => {
        const [searchParams, setSearchParams] = useSearchParams();
        const page: string = searchParams.get('page') || '1';
        const onChangePage = (page: number) => {
            searchParams.set('page', String(page));
            setSearchParams(searchParams);
        };
        return (
            <WrappedComponent
                {...(hocProps as T)}
                page={+page}
                pageSize={pageSize}
                onChangePage={onChangePage}
            />
        );
    };
}