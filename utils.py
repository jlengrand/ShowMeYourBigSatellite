import random

def random_coordinates():
    long_range = [55, 65]
    lat_range = [11, 21]
    return (
        random.randint(long_range[0], long_range[1]),
        random.randint(lat_range[0], lat_range[1]))


if __name__ == "__main__":
    for i in range(10):
        print random_coordinates()