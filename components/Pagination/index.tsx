import React from 'react';
import styles from './Pagination.module.scss'

type PaginationProps = {
    currentPage: number
    onNextPage: () => void
    onPrevPage: () => void
    totalPage: number
    setCurrentPage: (num: number) => void
}

export const Pagination:React.FC<PaginationProps> = ({currentPage, onNextPage, onPrevPage, totalPage, setCurrentPage}) => {
    return (
        <nav>
            <ul className={styles.pagination}>
                {currentPage === 1
                    ? <li style={{opacity: 0, cursor: "initial"}}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 7L9 12L14 17" stroke="#70737C" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </li>
                    : <li style={{ cursor: "pointer"}} onClick={onPrevPage}>
                        {/* <img src="headerIcon/arrowL.svg" alt=""/>*/}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 7L9 12L14 17" stroke="#70737C" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </li>}
                {Array.from({length: totalPage}, (_, i) => i + 1).map((num, i) => (
                    <li key={num}>
                        <p className={currentPage === num ? `${styles.paginationActive}` : ''}
                           onClick={() => setCurrentPage(num)}>{num}</p>
                    </li>
                ))}
                {currentPage !== totalPage
                    ? <li style={{ cursor: "pointer"}} onClick={onNextPage}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 17L15 12L10 7" stroke="#70737C" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </li>
                    : <li style={{opacity: 0, cursor: "initial"}}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 17L15 12L10 7" stroke="#70737C" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </li>
                }
                {/* <li>
                            <a className="page-numbers" href="https://seedra.us/seeds/">1</a>
                        </li>
                        <li>
                            <span aria-current="page" className="page-numbers current">2</span>
                        </li>
                        <li>
                            <a className="page-numbers" href="https://seedra.us/seeds/page/3/">3</a>
                        </li>
                        <li>
                            <span className="page-numbers dots">…</span>
                        </li>
                        <li>
                            <a className="page-numbers" href="https://seedra.us/seeds/page/17/">17</a>
                        </li>
                        <li>
                            <a className="next page-numbers" href="https://seedra.us/seeds/page/3/">
                                <img src="headerIcon/arrowR.svg" alt=""/>
                            </a>
                        </li>*/}
            </ul>
        </nav>
    /*    {Array.from({length: meta.totalPages}, (_, i) => i + 1).map((num, i) => (
                <li key={num}>
                    <p className={currentPage === num ? `${styles.paginationActive}` : ''}
                       onClick={() => setCurrentPage(num)}>{num}</p>
                </li>
            ))}*/



        /*<div className={styles.large}>
            <div className="pagination">
                <ul>
                    {currentPage !== 1 ? <li onClick={onPrevPage}><a href="#">1</a></li> : '' }
                    {Array.from({length: totalPage}, (_, i) => i + 1).map((num, i) => (
                        <li key={num}>
                            <a className={currentPage === num ? `${styles.paginationActive}` : ''}
                               onClick={() => setCurrentPage(num)}>{num}</a>
                        </li>
                    ))}
                    <li onClick={onNextPage}><a href="#"/></li>
                    {/!*<li><a href="#"></a></li>
                    setCurrentPage
                    <li className={styles.active}><a href="#"></a></li>
                    <li><a href="#"></a></li>
                    <li><a href="#"></a></li>
                    <li><a href="#"></a></li>*!/}

                </ul>
            </div>
        </div>
*/
        /*
                <div>
                    <div className="a-section a-text-center s-pagination-container" role="navigation"><span
                        className="s-pagination-strip"><a
                        href="/s?i=electronics-intl-ship&amp;bbn=16225009011&amp;rh=n%3A16225009011%2Cn%3A3248684011&amp;page=3&amp;qid=1669222620&amp;ref=sr_pg_4"
                        aria-label="Go to previous page, page 3"
                        className="s-pagination-item s-pagination-previous s-pagination-button s-pagination-separator"
                        mb-checked="1" data-tip=""><svg xmlns="http://www.w3.org/2000/svg" width="8" height="12"
                                                        viewBox="0 0 8 12" focusable="false" aria-hidden="true"><path
                        d="M5.874.35a1.28 1.28 0 011.761 0 1.165 1.165 0 010 1.695L3.522 6l4.113 3.955a1.165 1.165 0 010 1.694 1.28 1.28 0 01-1.76 0L0 6 5.874.35z"></path></svg>Previous</a><a
                        href="/s?i=electronics-intl-ship&amp;bbn=16225009011&amp;rh=n%3A16225009011%2Cn%3A3248684011&amp;qid=1669222620&amp;ref=sr_pg_1"
                        aria-label="Go to page 1" className="s-pagination-item s-pagination-button" mb-checked="1"
                        data-tip="">1</a><a
                        href="/s?i=electronics-intl-ship&amp;bbn=16225009011&amp;rh=n%3A16225009011%2Cn%3A3248684011&amp;page=2&amp;qid=1669222620&amp;ref=sr_pg_2"
                        aria-label="Go to page 2" className="s-pagination-item s-pagination-button" mb-checked="1"
                        data-tip="">2</a><a
                        href="/s?i=electronics-intl-ship&amp;bbn=16225009011&amp;rh=n%3A16225009011%2Cn%3A3248684011&amp;page=3&amp;qid=1669222620&amp;ref=sr_pg_3"
                        aria-label="Go to page 3" className="s-pagination-item s-pagination-button" mb-checked="1"
                        data-tip="">3</a><span className="s-pagination-item s-pagination-selected"
                                               aria-label="Current page, page 4">4</span><a
                        href="/s?i=electronics-intl-ship&amp;bbn=16225009011&amp;rh=n%3A16225009011%2Cn%3A3248684011&amp;page=5&amp;qid=1669222620&amp;ref=sr_pg_5"
                        aria-label="Go to page 5" className="s-pagination-item s-pagination-button" mb-checked="1"
                        data-tip="">5</a><span className="s-pagination-item s-pagination-ellipsis" aria-hidden="true"><svg
                        xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2" focusable="false"
                        aria-hidden="true"><path
                        d="M9 2c-.608 0-1-.425-1-1s.392-1 1-1 1 .448 1 1c0 .575-.392 1-1 1zM5 2c-.608 0-1-.425-1-1s.392-1 1-1 1 .448 1 1c0 .575-.392 1-1 1zM1 2c-.608 0-1-.425-1-1s.392-1 1-1 1 .448 1 1c0 .575-.392 1-1 1z"></path>...</svg></span><span
                        className="s-pagination-item s-pagination-disabled" aria-disabled="true">209</span><a
                        href="/s?i=electronics-intl-ship&amp;bbn=16225009011&amp;rh=n%3A16225009011%2Cn%3A3248684011&amp;page=5&amp;qid=1669222620&amp;ref=sr_pg_4"
                        aria-label="Go to next page, page 5"
                        className="s-pagination-item s-pagination-next s-pagination-button s-pagination-separator"
                        mb-checked="1" data-tip="">Next<svg xmlns="http://www.w3.org/2000/svg" width="8" height="12"
                                                            viewBox="0 0 8 12" focusable="false" aria-hidden="true"><path
                        d="M2.126.35a1.28 1.28 0 00-1.761 0 1.165 1.165 0 000 1.695L4.478 6 .365 9.955a1.165 1.165 0 000 1.694 1.28 1.28 0 001.76 0L8 6 2.126.35z"></path></svg></a></span>
                    </div>
                </div>*/
    );
};

