module Views.Link exposing (view)

import Html exposing (Html, a, text)
import Html.Attributes exposing (class, href)

import Services.Routing.Main exposing (Route, getRouteTitle, getRouteUrl)
import Core.Model exposing (Model)
import Core.Messages exposing (Msg)



view : Route -> Html Msg
view route =
    a [ class "navbar-item", href <| getRouteUrl route ] 
        [ text <| getRouteTitle route ]