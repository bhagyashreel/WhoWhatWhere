{omit} = require 'underscore'

requireVenueId = (options) ->
  throw new Error "Missing required venueId" unless options.venueId
  {
    venueId: options.venueId
    options: omit options, 'venueId'
  }

module.exports = (client) ->
  return {
    venues:
      # General endpoints
      categories: (callback) ->
        client.fetch 'venues/categories', {}, (err, data) ->
          callback err, data?.response?.categories

      search: (options = {}, callback) ->
        hasRequiredParameters = ->
          if options.intent == 'browse'
            (options.ll? && options.radius?) || (options.ne? && options.sw?) || (options.near? && options.radius?)
          else
            options.ll? || options.near?

        throw new Error "Missing location parameters" unless hasRequiredParameters()
        client.fetch 'venues/search', options, (err, data) ->
          callback err, data?.response?.venues

      suggestcompletion: (options = {}, callback) ->
        hasRequiredParameters = ->
          options.query? && (options.ll? || options.near?)

        throw new Error "Missing required parameters ('query', one of: ['ll', 'near'])" unless hasRequiredParameters()
        client.fetch 'venues/suggestcompletion', options, (err, data) ->
          callback err, data.response?.minivenues

      # Venue-specific endpoints

      detail: (options = {}, callback) ->
        {venueId} = requireVenueId options
        client.fetch "venues/#{venueId}", {}, (err, data) ->
          callback err, data?.response?.venue

      events: (options = {}, callback) ->
        {venueId} = requireVenueId options
        client.fetch "venues/#{venueId}/events", {}, (err, data) ->
          callback err, data?.response?.events

      hours: (options = {}, callback) ->
        {venueId} = requireVenueId options
        client.fetch "venues/#{venueId}/hours", {}, (err, data) ->
          callback err, data?.response

      likes: (options = {}, callback) ->
        {venueId} = requireVenueId options
        client.fetch "venues/#{venueId}/likes", {}, (err, data) ->
          callback err, data?.response?.likes

      links: (options = {}, callback) ->
        {venueId} = requireVenueId options
        client.fetch "venues/#{venueId}/links", {}, (err, data) ->
          callback err, data?.response?.links

      listed: (options = {}, callback) ->
        {venueId, options} = requireVenueId options
        options.group = 'other' # Only valid group without an acting user
        client.fetch "venues/#{venueId}/listed", options, (err, data) ->
          callback err, data?.response?.lists

      menu: (options = {}, callback) ->
        {venueId} = requireVenueId options
        client.fetch "venues/#{venueId}/menu", {}, (err, data) ->
          callback err, data?.response?.menu

      nextvenues: (options = {}, callback) ->
        {venueId} = requireVenueId options
        client.fetch "venues/#{venueId}/nextvenues", {}, (err, data) ->
          callback err, data?.response?.nextVenues

      photos: (options = {}, callback) ->
        hasValidParameters = ->
          !options.group? || options.group == 'venue'

        {venueId, options} = requireVenueId options
        throw new Error "Unsupported group parameter" unless hasValidParameters()
        client.fetch "venues/#{venueId}/photos", options, (err, data) ->
          callback err, data?.response?.photos

      tips: (options = {}, callback) ->
        {venueId, options} = requireVenueId options
        client.fetch "venues/#{venueId}/tips", options, (err, data) ->
          callback err, data?.response?.tips
  }
