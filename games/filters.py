from django_filters import rest_framework as filters


class GameFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="icontains")
    min_release_year = filters.NumberFilter(
        field_name="released", lookup_expr="year__lte"
    )
    max_release_year = filters.NumberFilter(
        field_name="released", lookup_expr="year__gte"
    )
    min_metacritic = filters.NumberFilter(field_name="metacritic", lookup_expr="lte")
    max_metacritic = filters.NumberFilter(field_name="metacritic", lookup_expr="gte")
    genre = filters.CharFilter(
        label="Genre name", field_name="genres__name", lookup_expr="iexact"
    )
    platform = filters.CharFilter(
        label="Platform name", field_name="platforms__name", lookup_expr="iexact"
    )
    developer = filters.CharFilter(
        label="Developer name", field_name="developers__name", lookup_expr="iexact"
    )
