import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link, useSearchParams } from 'react-router-dom';

const EventDiscovery = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [totalEvents, setTotalEvents] = useState(0);

    // Read filters from URL (maintains browsing state across navigation)
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const location = searchParams.get('location') || '';
    const dateFrom = searchParams.get('dateFrom') || '';
    const dateTo = searchParams.get('dateTo') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    const updateParam = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        // Reset to page 1 when filters change (except when changing page itself)
        if (key !== 'page') {
            newParams.delete('page');
        }
        setSearchParams(newParams);
    };

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const params = { page };
            if (search) params.search = search;
            if (category) params.category = category;
            if (location) params.location = location;
            if (dateFrom) params.dateFrom = dateFrom;
            if (dateTo) params.dateTo = dateTo;

            const res = await api.get('/events', { params });
            setEvents(res.data.events);
            setTotalPages(res.data.totalPages);
            setTotalEvents(res.data.totalEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    // Debounce fetch when filters change
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchEvents();
        }, 300);
        return () => clearTimeout(timer);
    }, [search, category, location, dateFrom, dateTo, page]);

    return (
        <div className="container mx-auto mt-8">
            {/* Filter Bar */}
            <div className="bg-white p-6 rounded shadow mb-8">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="border p-2 rounded flex-grow"
                        value={search}
                        onChange={(e) => updateParam('search', e.target.value)}
                    />
                    <select
                        className="border p-2 rounded"
                        value={category}
                        onChange={(e) => updateParam('category', e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Tech">Tech</option>
                        <option value="Sports">Sports</option>
                        <option value="Music">Music</option>
                        <option value="Business">Business</option>
                        <option value="Other">Other</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Location..."
                        className="border p-2 rounded"
                        value={location}
                        onChange={(e) => updateParam('location', e.target.value)}
                    />
                </div>
                {/* Date Filter Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <label className="text-sm text-gray-600 whitespace-nowrap">Date Range:</label>
                    <input
                        type="date"
                        className="border p-2 rounded"
                        value={dateFrom}
                        onChange={(e) => updateParam('dateFrom', e.target.value)}
                    />
                    <span className="text-gray-400">to</span>
                    <input
                        type="date"
                        className="border p-2 rounded"
                        value={dateTo}
                        onChange={(e) => updateParam('dateTo', e.target.value)}
                    />
                    {(search || category || location || dateFrom || dateTo) && (
                        <button
                            onClick={() => setSearchParams({})}
                            className="text-sm text-red-500 hover:text-red-700 underline ml-auto"
                        >
                            Clear All Filters
                        </button>
                    )}
                </div>
            </div>

            {/* Results Count */}
            {!loading && (
                <p className="text-sm text-gray-500 mb-4">
                    Showing {events.length} of {totalEvents} events
                    {(search || category || location || dateFrom || dateTo) && ' (filtered)'}
                </p>
            )}

            {/* Event Grid */}
            {loading ? (
                <p className="text-center text-gray-500">Loading events...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div key={event._id} className="bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition">
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{event.category}</span>
                                        <span className="text-gray-500 text-sm">{new Date(event.date).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                        <span>📍 {event.location}</span>
                                        <span>👥 {event.availableSeats} / {event.capacity} seats</span>
                                    </div>
                                    <Link to={`/events/${event._id}`} className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No events found matching your criteria.</p>
                    )}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8 mb-8">
                    <button
                        onClick={() => updateParam('page', String(page - 1))}
                        disabled={page <= 1}
                        className={`px-4 py-2 rounded ${page <= 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            onClick={() => updateParam('page', String(p))}
                            className={`px-3 py-2 rounded ${p === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            {p}
                        </button>
                    ))}
                    <button
                        onClick={() => updateParam('page', String(page + 1))}
                        disabled={page >= totalPages}
                        className={`px-4 py-2 rounded ${page >= totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default EventDiscovery;
