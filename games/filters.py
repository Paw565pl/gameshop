from django_filters import rest_framework as filters


class GameFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="icontains")

    min_release_year = filters.NumberFilter(
        field_name="released", lookup_expr="year__gte"
    )
    max_release_year = filters.NumberFilter(
        field_name="released", lookup_expr="year__lte"
    )

    min_metacritic = filters.NumberFilter(field_name="metacritic", lookup_expr="gte")
    max_metacritic = filters.NumberFilter(field_name="metacritic", lookup_expr="lte")

    min_price = filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = filters.NumberFilter(field_name="price", lookup_expr="lte")

    genre = filters.CharFilter(
        label="Genre slug", field_name="genres__slug", lookup_expr="iexact"
    )
    platform = filters.CharFilter(
        label="Platform slug", field_name="platforms__slug", lookup_expr="iexact"
    )
    developer = filters.CharFilter(
        label="Developer slug", field_name="developers__slug", lookup_expr="iexact"
    )
