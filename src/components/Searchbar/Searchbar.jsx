import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

function Searchbar({ onHandleSubmit, onSearchQueryChange, value }) {
    return (
        <header className={styles.Searchbar}>
            <form className={styles.SearchForm} onSubmit={onHandleSubmit}>
                <button type="submit" className={styles.Button}>
                    <span className={styles.label}>Search</span>
                </button>

                <input
                    className={styles.input}
                    type="text"
                    value={value}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={onSearchQueryChange}
                />
            </form>
        </header>
    );
}

Searchbar.propTypes = {
    onHandleSubmit: PropTypes.func.isRequired,
    onSearchQueryChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default Searchbar;