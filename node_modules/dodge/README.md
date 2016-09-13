# Dodge

An API client for Foursquare's [Venues Service][venues-service].

[venues-service]: https://developer.foursquare.com/overview/venues

## Installation

```bash
npm install dodge --save
```

## Usage

Register your app with the [Foursquare API][foursquare-api] to recieve a Client ID and Client Secret.

```javascript
var Dodge, client, apiOptions;

Dodge = require('dodge');

client = new Dodge({
  clientId: 'four',
  clientSecret: 'square'
});

/* varies by endpoint; refer to Foursquare documentation */
apiOptions = {
  categoryId: '4bf58dd8d48988d122941735',
  intent: 'browse',
  near: 'Chicago, IL'
}

client.venues.search(apiOptions, function(err, venues){
  /* do something */
});
```

[foursquare-api]: https://developer.foursquare.com/

## Endpoints

Dodge supports endpoints that are part of Foursquare's [Venues Service][venues-service] and do not require user authentication.

### General Endpoints

| Endpoint                   | Description (link to API documentation)                  | Supported?             |
| -------------------------- | -------------------------------------------------------- | ---------------------- |
| `venues/categories`        | [Venue Categories][venues/categories]                    | Yes :white_check_mark: |
| `venues/explore`           | [Explore Recommended and Popular Venues][venues/explore] | Not Yet :x:            |
| `venues/search`            | [Search Venues][venues/search]                           | Yes :white_check_mark: |
| `venues/suggestcompletion` | [Suggest Completion Venues][venues/suggestcompletion]    | Yes :white_check_mark: |
| `venues/trending`          | [Trending Venues][venues/trending]                       | Not Yet :x:            |

[venues/categories]: https://developer.foursquare.com/docs/venues/categories
[venues/explore]: https://developer.foursquare.com/docs/venues/explore
[venues/search]: https://developer.foursquare.com/docs/venues/search
[venues/suggestcompletion]: https://developer.foursquare.com/docs/venues/suggestcompletion
[venues/trending]: https://developer.foursquare.com/docs/venues/trending

### Venue-specific Endpoints

| Endpoint                     | Description (link to API documentation)            | Supported?                         |
| ---------------------------- | -------------------------------------------------- | ---------------------------------- |
| `venues/<venue>`             | [Venue Details][venues/venue]                      | Yes :white_check_mark:             |
| `venues/<venue>/events`      | [Venue Events][venues/venue/events]                | Yes :white_check_mark:             |
| `venues/<venue>/hours`       | [Venue Hours][venues/venue/hours]                  | Yes :white_check_mark:             |
| `venues/<venue>/likes`       | [Users who have liked a venue][venues/venue/likes] | Yes :white_check_mark:             |
| `venues/<venue>/links`       | [Links For a Venue][venues/venue/links]            | Yes :white_check_mark:             |
| `venues/<venue>/listed`      | [Lists][venues/venue/listed]                       | Yes<sup>1</sup> :white_check_mark: |
| `venues/<venue>/menu`        | [Venue Menu][venues/venue/menu]                    | Yes :white_check_mark:             |
| `venues/<venue>/nextvenues`  | [Next Venues][venues/venue/nextvenues]             | Yes :white_check_mark:             |
| `venues/<venue>/photos`      | [Photos from a Venue][venues/venue/photos]         | Yes<sup>2</sup> :white_check_mark: |
| `venues/<venue>/tips`        | [Tips from a Venue][venues/venue/tips]             | Yes :white_check_mark:             |

<sup>1</sup>: Does not accept a `group` parameter. Only `others` is supported without an acting user, so that parameter is passed by the library.

<sup>2</sup>: Supported `group` parameters: none or `venue` (`checkin` require an acting user, which is not supported.)

[venues/venue]: https://developer.foursquare.com/docs/venues/venues
[venues/venue/events]: https://developer.foursquare.com/docs/venues/events
[venues/venue/hours]: https://developer.foursquare.com/docs/venues/hours
[venues/venue/likes]: https://developer.foursquare.com/docs/venues/likes
[venues/venue/links]: https://developer.foursquare.com/docs/venues/links
[venues/venue/listed]: https://developer.foursquare.com/docs/venues/listed
[venues/venue/menu]: https://developer.foursquare.com/docs/venues/menu
[venues/venue/nextvenues]: https://developer.foursquare.com/docs/venues/nextvenues
[venues/venue/photos]: https://developer.foursquare.com/docs/venues/photos
[venues/venue/tips]: https://developer.foursquare.com/docs/venues/tips
