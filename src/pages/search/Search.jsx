import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import Nav from '../../components/browse/Nav';
import SearchResult from '../../components/search/SearchResult';
import './Search.css';

const Search = () => {
	const [query, setQuery] = useState();
	const [searchInput, setSearchInput] = useState({
		keyword: '',
		genre_ids: '',
		language: '',
		media_type: '',
		year: ''
	});
	const [genreList, setGenreList] = useState([]);
	useEffect(() => {
		async function fetchGenreList() {
			const request = await axios.get('/genrelist')
			setGenreList(request.data)
			return request
		}
		fetchGenreList();
	}, ['/genrelist'])
	// const handleInputChange = (e) => {
	// 	console.log(e.target.name)
	// 	const target = e.target;
	// 	const value = target.type === "checkbox" ? target.checked : target.value;
	// 	const name = target.name;
	// 	setSearchInput({ ...searchInput, keyword: value })
	// }

	const handleSearch = (event) => {
		setQuery(searchInput)
	}

	const resetSearch = () => {
		setQuery('');
		setSearchInput(
			{
				keyword: '',
				genre_ids: '',
				language: '',
				media_type: '',
				year: ''
			}
		);
	}

	return (
		<div className='app'>
			<Nav />
			<div className='s009'>
				<form >
					<div className='inner-form'>
						<div className='basic-search'>
							<div className='input-field'>
								<input
									type='text'
									placeholder='Type Keywords'
									name="keyword"
									id='keyword'
									onChange={(e) => setSearchInput({ ...searchInput, keyword: e.target.value })}
									value={searchInput.keyword}
								/>
								<div className='icon-wrap'>
									<svg
										className='svg-inline--fa fa-search fa-w-16'
										fill='#ccc'
										aria-hidden='true'
										data-prefix='fas'
										data-icon='search'
										role='img'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 512 512'>
										<path d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'></path>
									</svg>
								</div>
							</div>
						</div>
						<div className='advance-search'>
							<div className='row second text_color'>
								<div >
									<label htmlFor="genre">Genre: </label>
									<select type='select' id='genre' name='genre'
										onChange={(e) => {
											const genre = genreList.find(genr => genr.name === e.target.value)
											setSearchInput({ ...searchInput, genre_ids: genre.id })
										}}
									>
										{genreList?.map(genre => {
											return <option key={genre.id}>{genre.name}</option>
										})}
									</select>
								</div>
								<div>
									<label htmlFor="media_type">Media Type: </label>
									<select type='select' id='media_type' name='media_type'
										onChange={(e) => setSearchInput({ ...searchInput, media_type: e.target.value })}
										value={searchInput.media_type}

									>
										<option>All</option>
										<option>Movie</option>
										<option>TV</option>
										<option>Person</option>

									</select>
								</div>
								<div>
									<label htmlFor="language">Language: </label>
									<select type='select' id='language' name='language'
										onChange={(e) => setSearchInput({ ...searchInput, language: e.target.value })}
										value={searchInput.language}

									>
										<option>Select Language</option>
										<option>en-us</option>
										<option>jp</option>
										<option>kr</option>
									</select>
								</div>
								<div>
									<label htmlFor="year">Year: </label>
									<input
										type='number'
										placeholder='Year'
										name="year"
										id='year'
										onChange={(e) => setSearchInput({ ...searchInput, year: e.target.value })}
										value={searchInput.year}

									/>
								</div>
							</div>
							<div className='row third'>
								<div className='input-field'>
									<div className='result-count'>
									</div>
									<div className='group-btn'>
										<button
											className='btn-delete'
											onClick={resetSearch}
											type='button'
										>
											RESET
										</button>
										<button
											className='btn-search'
											type='button'
											onClick={() => handleSearch()}
										>SEARCH</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
			<SearchResult query={query} />
		</div>
	);
};

export default Search;
