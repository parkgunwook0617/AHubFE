interface PaginationProps {
    page: number;
    numPages: number;
    setPage: (page: number) => void;
}

const Pagination = ({ page, numPages, setPage }: PaginationProps) => {
    const getPageGroup = () => {
        let start = Math.max(1, page - 2);
        let end = Math.min(numPages, start + 4);

        if (end - start < 4) {
            start = Math.max(1, end - 4);
        }

        const group = [];
        for (let i = start; i <= end; i++) {
            if (i >= 1) group.push(i);
        }
        return group;
    };

    return (
        <footer className="p-10 flex justify-center items-center space-x-2">
            <button
                className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-30"
                onClick={() => setPage(1)}
                disabled={page === 1}
            >
                {"<<"}
            </button>
            <button
                className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-30"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
            >
                {"<"}
            </button>
            <div className="flex space-x-1">
                {getPageGroup().map((num) => (
                    <button
                        key={num}
                        onClick={() => setPage(num)}
                        className={`px-4 py-2 rounded-md border ${page === num
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {num}
                    </button>
                ))}
            </div>
            <button
                className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-30"
                onClick={() => setPage(page + 1)}
                disabled={page === numPages || numPages === 0}
            >
                {">"}
            </button>

            <button
                className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-30"
                onClick={() => setPage(numPages)}
                disabled={page === numPages || numPages === 0}
            >
                {">>"}
            </button>
        </footer>
    );
};

export default Pagination;